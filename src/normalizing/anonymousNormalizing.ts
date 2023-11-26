import { Anonymous, AnonymousEntity } from "@/models";

export function anonymousNormalizing(anonymous: Anonymous): AnonymousEntity {
  return {
    ip: anonymous.ip,
    name: anonymous.name,
    nameWithIp: `${anonymous.name}(${anonymous.ip})`,
  };
}
