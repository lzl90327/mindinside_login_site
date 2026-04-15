import type { LoginRouteSystemId } from "@/config/routes";
import { assetLoginSystemConfig } from "@/systems/asset/config";
import { bmsLoginSystemConfig } from "@/systems/bms/config";
import { crmLoginSystemConfig } from "@/systems/crm/config";
import { hrLoginSystemConfig } from "@/systems/hr/config";
import { masterLoginSystemConfig } from "@/systems/master/config";
import { tmsLoginSystemConfig } from "@/systems/tms/config";
import { wmsLoginSystemConfig } from "@/systems/wms/config";
import type { LoginSystemConfig } from "@/types/login-system";

const BY_ID: Record<LoginRouteSystemId, LoginSystemConfig> = {
  wms: wmsLoginSystemConfig,
  tms: tmsLoginSystemConfig,
  crm: crmLoginSystemConfig,
  hr: hrLoginSystemConfig,
  bms: bmsLoginSystemConfig,
  asset: assetLoginSystemConfig,
  master: masterLoginSystemConfig,
};

export function getLoginSystemConfig(id: LoginRouteSystemId): LoginSystemConfig {
  return BY_ID[id];
}

export function isLoginRouteSystemId(id: string): id is LoginRouteSystemId {
  return id in BY_ID;
}
