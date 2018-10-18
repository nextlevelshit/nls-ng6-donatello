import { Injectable } from '@angular/core';
import * as slugify from 'slugify';

import { Meta } from './../model/meta';

@Injectable({
  providedIn: 'root'
})
export class MarkdownService {
  protected lines: string[];
  protected raw: string;

  constructor() { }

  public parseRaw(raw: any) {
    this.raw = raw;
    this.lines = raw.split('\n');
  }

  public get meta(): Meta {
    return {
      title: '',
      description: '',
      keywords: [],
      headlines: this.headlines
    };
  }

  public get content() {
    return this.raw;
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
