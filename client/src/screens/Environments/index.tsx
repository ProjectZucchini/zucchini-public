import { useGetAssetsQuery } from "../../generated/graphql";
import { Diagram } from "../../components/Diagram";

export function Environments() {
  const { loading, data } = useGetAssetsQuery();
  const assets = data?.organization.assets;

  if (!assets || loading) {
    return <></>;
  }

  return <Diagram assets={assets} />;
}
