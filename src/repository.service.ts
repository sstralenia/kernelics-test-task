import Debug from 'debug';

import { fetchRepositories, getRepository, getRepositoryContent, getRepositoryWebhooks } from './github.service';
import { Visibility } from './generated/graphql';

const debug = Debug('repository');

async function getRepositoryFiles({ name, owner, token, path = '' }: { name: string; owner: string; token: string; path?: string; }): Promise<string[]> {
  const files: string[] = [];

  const contents = await getRepositoryContent({
    name,
    owner,
    token,
    path,
  });

  debug('contents:', contents.length, path);

  for (const item of contents) {
      if (item.type === 'file') {
        files.push(item.path);
      } else if (item.type === 'dir') {
        const filesInDir = await getRepositoryFiles({ name, owner, token, path: item.path })
        files.push(...filesInDir);
      }
  }

  return files;
}

const getWebhooks = async ({ name, token, owner }: { name: string; token: string; owner: string; }) => {
  const webhooks = await getRepositoryWebhooks({ name, token, owner });

  debug('webhooks', webhooks);

  return webhooks.map(hook => ({
    id: hook.id,
    url: hook.url,
    name: hook.name,
  }));
}

export const getRepositories = async ({ token }: { token: string; }) => {
  const repositories = await fetchRepositories({ token });

  debug('repositories', repositories);

  return repositories.map(repo => ({
    name: repo.name,
    size: repo.size,
    owner: repo.owner.login,
  }));
};

/**
 * @TODO: Probably need to add cache for some time
 */
export const getRepositoryDetails = async ({ name, token, owner }: { name: string; token: string; owner: string; }) => {
  const repository = await getRepository({ name, token, owner });
  debug('repository', repository);

  const repositoryFiles = await getRepositoryFiles({ name, owner, token });
  debug('repositoryFiles', repositoryFiles);
  const filesCount = repositoryFiles.length;

  const ymlFile = repositoryFiles.find(file => file.endsWith('.yml'));
  debug('ymlFile', ymlFile);

  let ymlContent: string | null = null;

  if (ymlFile) {
    const fileContent = await getRepositoryContent({ name, owner, token, path: ymlFile });
    debug('fileContent', fileContent);

    ymlContent = Buffer.from(fileContent.content, fileContent.encoding).toString('utf-8');
  }

  const webhooks = await getWebhooks({ name, owner, token });

  return {
    name: repository.name,
    size: repository.size,
    owner: repository.owner.login,
    visibility: repository.private ? Visibility.Private : Visibility.Public,
    numberOfFiles: filesCount,
    ymlContent,
    webhooks,
  };
};