import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type IRepository = {
  name: Scalars['String']['output'];
  owner: Scalars['String']['output'];
  size: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  repositories?: Maybe<Array<Maybe<Repository>>>;
  repositoryDetails?: Maybe<RepositoryDetails>;
};


export type QueryRepositoriesArgs = {
  input: QueryRepoInput;
};


export type QueryRepositoryDetailsArgs = {
  input: QueryRepoDetailsInput;
};

export type QueryRepoDetailsInput = {
  name: Scalars['String']['input'];
  owner: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type QueryRepoInput = {
  token: Scalars['String']['input'];
};

export type Repository = IRepository & {
  __typename?: 'Repository';
  name: Scalars['String']['output'];
  owner: Scalars['String']['output'];
  size: Scalars['Int']['output'];
};

export type RepositoryDetails = IRepository & {
  __typename?: 'RepositoryDetails';
  name: Scalars['String']['output'];
  numberOfFiles: Scalars['Int']['output'];
  owner: Scalars['String']['output'];
  size: Scalars['Int']['output'];
  visibility: Visibility;
  webhooks: Array<Webhook>;
  ymlContent?: Maybe<Scalars['String']['output']>;
};

export enum Visibility {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type Webhook = {
  __typename?: 'Webhook';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  url: Scalars['String']['output'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;


/** Mapping of interface types */
export type ResolversInterfaceTypes<_RefType extends Record<string, unknown>> = {
  IRepository: ( Repository ) | ( RepositoryDetails );
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  IRepository: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['IRepository']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Query: ResolverTypeWrapper<{}>;
  QueryRepoDetailsInput: QueryRepoDetailsInput;
  QueryRepoInput: QueryRepoInput;
  Repository: ResolverTypeWrapper<Repository>;
  RepositoryDetails: ResolverTypeWrapper<RepositoryDetails>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Visibility: Visibility;
  Webhook: ResolverTypeWrapper<Webhook>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  IRepository: ResolversInterfaceTypes<ResolversParentTypes>['IRepository'];
  Int: Scalars['Int']['output'];
  Query: {};
  QueryRepoDetailsInput: QueryRepoDetailsInput;
  QueryRepoInput: QueryRepoInput;
  Repository: Repository;
  RepositoryDetails: RepositoryDetails;
  String: Scalars['String']['output'];
  Webhook: Webhook;
};

export type IRepositoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['IRepository'] = ResolversParentTypes['IRepository']> = {
  __resolveType: TypeResolveFn<'Repository' | 'RepositoryDetails', ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  size?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  repositories?: Resolver<Maybe<Array<Maybe<ResolversTypes['Repository']>>>, ParentType, ContextType, RequireFields<QueryRepositoriesArgs, 'input'>>;
  repositoryDetails?: Resolver<Maybe<ResolversTypes['RepositoryDetails']>, ParentType, ContextType, RequireFields<QueryRepositoryDetailsArgs, 'input'>>;
};

export type RepositoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Repository'] = ResolversParentTypes['Repository']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  size?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RepositoryDetailsResolvers<ContextType = any, ParentType extends ResolversParentTypes['RepositoryDetails'] = ResolversParentTypes['RepositoryDetails']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  numberOfFiles?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  size?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  visibility?: Resolver<ResolversTypes['Visibility'], ParentType, ContextType>;
  webhooks?: Resolver<Array<ResolversTypes['Webhook']>, ParentType, ContextType>;
  ymlContent?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WebhookResolvers<ContextType = any, ParentType extends ResolversParentTypes['Webhook'] = ResolversParentTypes['Webhook']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  IRepository?: IRepositoryResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Repository?: RepositoryResolvers<ContextType>;
  RepositoryDetails?: RepositoryDetailsResolvers<ContextType>;
  Webhook?: WebhookResolvers<ContextType>;
};

