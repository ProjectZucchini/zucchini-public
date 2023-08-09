import { AssetType } from "../../../../generated/graphql";
import { Application } from "./Application";
import { AvailabilityZone } from "./AvailabilityZone";
import { Database } from "./Database";

export const nodeTypes: Record<AssetType, React.NamedExoticComponent<any>> = {
  APPLICATION: Application,
  AVAILABILITY_ZONE: AvailabilityZone,
  DATABASE: Database,
};
