import {
  FRONTMATTER_ALIASES,
  PROJECT_FRONTMATTER_KEYS,
  validateProjectFrontmatterKeys,
} from 'myst-frontmatter';
import type { ValidationOptions } from 'simple-validators';
import {
  defined,
  incrementOptions,
  validateObjectKeys,
  validateString,
  validateList,
} from 'simple-validators';
import type { ProjectConfig } from './types.js';

const PROJECT_CONFIG_KEYS = {
  optional: ['remote', 'index', 'exclude', 'plugins', ...PROJECT_FRONTMATTER_KEYS],
  alias: FRONTMATTER_ALIASES,
};

function validateProjectConfigKeys(value: Record<string, any>, opts: ValidationOptions) {
  const output: ProjectConfig = validateProjectFrontmatterKeys(value, opts);
  if (defined(value.remote)) {
    output.remote = validateString(value.remote, incrementOptions('remote', opts));
  }
  if (defined(value.index)) {
    // TODO: Warn if these files don't exist
    output.index = validateString(value.index, incrementOptions('index', opts));
  }
  if (defined(value.exclude)) {
    output.exclude = validateList(
      value.exclude,
      incrementOptions('exclude', opts),
      (file, index: number) => {
        return validateString(file, incrementOptions(`exclude.${index}`, opts));
      },
    );
  }
  if (defined(value.plugins)) {
    output.plugins = validateList(
      value.plugins,
      incrementOptions('plugins', opts),
      (file, index: number) => {
        return validateString(file, incrementOptions(`plugins.${index}`, opts));
      },
    );
  }
  return output;
}

/**
 * Validate ProjectConfig object against the schema
 */
export function validateProjectConfig(input: any, opts: ValidationOptions): ProjectConfig {
  const value = validateObjectKeys(input, PROJECT_CONFIG_KEYS, opts) || {};
  return validateProjectConfigKeys(value, opts);
}
