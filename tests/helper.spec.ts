// tslint:disable:no-unused-expression
// tslint:disable:max-line-length
import * as chai from 'chai';
const { expect } = chai;

// Load chai plugins
import chaiArrays = require('chai-arrays');
chai.use(chaiArrays);
import chaiExclude = require('chai-exclude');
chai.use(chaiExclude);
import chaiString = require('chai-string');
chai.use(chaiString);

import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import gql from 'graphql-tag';
import * as Realm from 'realm';
import { setTimeout } from 'timers';
import { v4 } from 'uuid';

import { Credentials, GraphQLConfig, User } from '../src/index';
import { Company, generateFakeDataRealm } from './generate-fake-data';
import { GraphQLTestServer } from './GraphQLTestServer';

describe('RealmGraphQL', () => {
  const userId = v4();

  // template literals deprecated https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html

  // let testServer: GraphQLTestServer;
  // https://stackoverflow.com/questions/38324949/error-ts2339-property-x-does-not-exist-on-type-y

//typescript error code 2339
  // testServer.address = 'https://www.localhost:3000';

  let graphQLUser: User;
  let serverUrl: string = 'https://www.localhost:3000';
  let firstCompanyNameLetter: string;
  let lastCompanyNameLetter: string;
  let helper: GraphQLConfig;
  let testRealm: Realm;
  let client: ApolloClient<NormalizedCacheObject>;

  const ensureSynced = async (direction?: 'download' | 'upload') => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    await new Promise<void>((resolve) => {
      testRealm.syncSession.addProgressNotification(
        direction || 'download',
        'forCurrentlyOutstandingWork',
        (downloaded, downloadable) => {
          if (downloaded >= downloadable) {
            resolve();
          }
        },
      );
    });
  };

  const queryCompanies = async (additionalParameters?: string, expectResults = true): Promise<Company[]> => {
    const result = await client.query<{companies: Company[]}>({
      query: gql`
        query {
          companies${additionalParameters || ''} {
            companyId
            name
            address
          }
        }
      `,
      fetchPolicy: 'network-only'
    });

    if (expectResults) {
      expect(result.data.companies.length).to.be.above(0);
    } else {
      expect(result.data.companies.length).to.equal(0);
    }

    return result.data.companies;
  };

  const getCompanyCount = () => {
    return testRealm.objects('Company').length;
  };

  before(async () => {
    // testServer = new GraphQLTestServer();
    // await testServer.start();

    serverUrl = `http://localhost:3000`;

    const credentials = Credentials.nickname(userId);
    graphQLUser = await User.authenticate(credentials, serverUrl);
  });

  after(async () => {
    // await testServer.shutdown();
  });
// simulator deleted with deprecated template literals

});
function serverUrl(serverUrl: any, arg1: Realm.Sync.Credentials) {
  throw new Error('Function not implemented.');
}

