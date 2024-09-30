import { getRepositoryDetails, getRepositories } from './repository.service';
import { Semaphore } from 'async-mutex';
import Debug from 'debug';

const debug = Debug('resolvers');
const MAX_CONCURRENT_REQUESTS = 1;
const semaphore = new Semaphore(MAX_CONCURRENT_REQUESTS);

export const resolvers = {
  Query: {
    repositories: async (_parent, args) => {
      const { token } = args.input;
      return getRepositories({ token });
    },
    repositoryDetails: (_parent, args) => {
      /**
       * It's ok if server has one instance only
       * Otherwise requires distributed lock like Redlock
       */
      return semaphore.runExclusive(async () => {
        debug('Running repositoryDetails resolver...');

        const { token, name, owner } = args.input;
        const response = await getRepositoryDetails({
          token,
          name,
          owner,
        });

        debug('repositoryDetails response:', response);

        return response;
      });
    }
  },
};
