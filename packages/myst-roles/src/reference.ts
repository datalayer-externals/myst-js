import type { RoleSpec, RoleData, GenericNode } from 'myst-common';
import { normalizeLabel } from 'myst-common';

const REF_PATTERN = /^(.+?)<([^<>]+)>$/; // e.g. 'Labeled Reference <ref>'

export const refRole: RoleSpec = {
  name: 'ref',
  alias: ['eq', 'numref', 'prf:ref'],
  body: {
    type: String,
    required: true,
  },
  run(data: RoleData): GenericNode[] {
    const body = data.body as string;
    const match = REF_PATTERN.exec(body);
    const [, modified, rawLabel] = match ?? [];
    const { label, identifier } = normalizeLabel(rawLabel ?? body) || {};
    return [
      {
        type: 'crossReference',
        kind: data.name,
        identifier,
        label,
        children: modified ? [{ type: 'text', value: modified.trim() }] : undefined,
      },
    ];
  },
};
