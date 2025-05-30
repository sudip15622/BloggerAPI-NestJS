import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils';
import { defaultFieldResolver, GraphQLSchema } from 'graphql';
import { format } from 'date-fns';

/**
 * A GraphQL directive transformer that formats date fields according to specified format
 * @param schema - The original GraphQL schema
 * @param directiveName - The name of the directive to look for
 * @returns The transformed schema with date formatting applied to designated fields
 */
export function dateFormatDirectiveTransformer(
  schema: GraphQLSchema,
  directiveName: string,
) {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const dateDirective = getDirective(
        schema,
        fieldConfig,
        directiveName,
      )?.[0];

      if (dateDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig;
        // const { formatString = 'yyyy-MM-dd' } = dateDirective;
        const formatString = dateDirective.format;

        fieldConfig.resolve = async function (source, args, context, info) {
          const result = await resolve(source, args, context, info);
          
          // If result is null or undefined, return as-is
          if (result == null) {
            return result;
          }
          
          // Handle array of dates
          if (Array.isArray(result)) {
            return result.map(date => format(new Date(date), formatString));
          }
          
          // Format single date
          return format(new Date(result as string), formatString);
        };
        
        return fieldConfig;
      }
    },
  });
}