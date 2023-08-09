import { useCallback } from "react";
import {
  GetAssetsDocument,
  useHookCreateConnectionMutation,
  type GetAssetsQuery,
} from "../../generated/graphql";

export function useCreateConnection() {
  const [hookCreateConnectionMutation] = useHookCreateConnectionMutation();

  const createConnection = useCallback(
    (sourceId: number, targetId: number) => {
      hookCreateConnectionMutation({
        variables: {
          data: {
            sourceId,
            targetId,
          },
        },
        optimisticResponse: {
          createConnection: {
            connection: {
              id: Date.now().toString(),
              __typename: "AssetConnection",
              target: {
                id: targetId.toString(),
                __typename: "Asset",
              },
            },
          },
        },
        update(cache, { data }) {
          const cachedQuery = cache.readQuery<GetAssetsQuery>({
            query: GetAssetsDocument,
          });
          const newConnection = data?.createConnection?.connection;

          if (!cachedQuery?.organization.assets || !newConnection) {
            return;
          }

          const updatedAssets = cachedQuery.organization.assets.map((asset) => {
            if (asset.id === sourceId.toString()) {
              const newAsset = {
                ...asset,
                connections: [...asset.connections, newConnection],
              };

              return newAsset;
            }
            return asset;
          });
          cache.writeQuery({
            query: GetAssetsDocument,
            data: {
              organization: {
                ...cachedQuery.organization,
                assets: updatedAssets,
              },
            },
          });
        },
      });
    },
    [hookCreateConnectionMutation]
  );

  return createConnection;
}
