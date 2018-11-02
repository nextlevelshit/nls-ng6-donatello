import { Injectable } from '@angular/core';
import slugify from 'slugify';
import yaml from 'js-yaml';

import { IMetaData } from './../model/meta';

@Injectable({
  providedIn: 'root'
})
export class MarkdownService {
  protected lines: string[];
  protected raw: string;
  protected metaRaw: string[];
  protected contentRaw: string[];

  constructor() { }

  public parseInput(raw: any) {
    this.lines = raw.split('\n');
    this.raw = raw;
    this.splitRaw();
  }

  protected splitRaw() {
    const correctionValue = 1;

    const separatorIndex
      = this.lines
        .slice(correctionValue, -1)
        .findIndex(line => {
          return line.search(/(\S)\1{2,}/) === 0;
        }) + correctionValue;

    this.metaRaw = this.lines.slice(0, separatorIndex);
    this.contentRaw = this.lines.slice(separatorIndex + 1, -1);
  }

  public get meta() {
    const metaParsed = yaml.safeLoad(this.metaRaw.join('\n'), 'utf8');

    return {
      headlines: this.headlines,
      ...metaParsed
    };
  }

  public get content() {
    return this.contentRaw.join('\n');
  }

  public get headlines() {
    const headlinesRaw = this.lines.filter(line => {
      return line.startsWith('#');
    });

    return headlinesRaw.map((headline, i, map) => {
      const plain = headline.replace(/[#]+/g, '').trim();
      return {
        plain: plain,
        slug: slugify(plain, {lower: true})
      };
    });
  }

}
