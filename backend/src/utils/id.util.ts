/**
 * Parse route parameter ID to integer
 * @param idParam - Route parameter value (can be string, string[], or undefined)
 * @returns Parsed ID as number, or null if invalid
 */
export function parseIdParam(idParam: string | string[] | undefined): number | null {
  if (typeof idParam !== "string") {
    return null;
  }

  const parsedId = Number.parseInt(idParam, 10);
  return Number.isNaN(parsedId) ? null : parsedId;
}
