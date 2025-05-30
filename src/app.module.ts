import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AuthorsModule } from './authors/authors.module';
import { dateFormatDirectiveTransformer } from './common/directives/format-date.directive';
import { GraphQLDirective, DirectiveLocation, GraphQLString } from 'graphql';

@Module({
  imports: [
    PostsModule,
    AuthModule,
    UsersModule,
    AuthorsModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      graphiql: true,
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      transformSchema: (schema) =>
        dateFormatDirectiveTransformer(schema, 'date'),
      buildSchemaOptions: {
        directives: [
          new GraphQLDirective({
            name: 'date',
            args: {
              format: {
                type: GraphQLString,
                defaultValue: 'yyyy-MM-dd',
              }
            },
            locations: [DirectiveLocation.FIELD_DEFINITION],
          }),
        ],
      },
      subscriptions: {
        'graphql-ws': {
          path: '/graphql', // Explicitly specify the path
        },
        // For backwards compatibility
        'subscriptions-transport-ws': {
          path: '/graphql',
        },
      },

      context: ({ req, connection }) => {
        // Handle both HTTP and WebSocket connections
        return connection ? { req: connection.context } : { req };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
