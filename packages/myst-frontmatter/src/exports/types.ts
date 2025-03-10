export enum ExportFormats {
  pdf = 'pdf',
  tex = 'tex',
  pdftex = 'pdf+tex',
  docx = 'docx',
  xml = 'xml',
  md = 'md',
  meca = 'meca',
}

export type Export = {
  format: ExportFormats;
  template?: string | null;
  output?: string;
  article?: string;
  /** sub_articles are only for jats xml export */
  sub_articles?: string[];
  /** MECA: to, from later */
} & Record<string, any>;
