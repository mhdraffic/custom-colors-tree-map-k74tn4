import { Component, NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { single } from './data';
import * as d3Scale from 'd3-scale';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  single: any[];
  original: any = [];
  viewData: any = [];
  loadData: any = [];
  multi: any[];
  back: boolean = false;
  view: any[] = [700, 400];

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };

  colorScale: any;

  generateColorScale() {
    const values: number[] = this.single.map((s) => s.value);
    console.log(JSON.stringify(values));
    return d3Scale
      .scaleLinear()
      .domain([Math.min(...values), Math.max(...values)])
      .range(['red', 'black']);
  }

  customColors = (name) => {
    const value = this.single.find((s) => s.name === name).value;
    return this.colorScale(value);
  };

  constructor() {
    Object.assign(this, { single });
    Object.assign(this.original, single);
    console.log(JSON.stringify(this.single));
  }

  ngOnInit() {
    this.colorScale = this.generateColorScale();
  }
  // value: any;
  // backIndex = 0;
  onSelect(event) {
    console.log(event);
    console.log(JSON.stringify(this.loadData));

    if (this.loadData.length == 0) this.loadData = this.original;

    var index = this.loadData.findIndex((s) => s.name === event.name);
    console.log(index);
    console.log(JSON.stringify(this.loadData));
    if (index != -1 && this.loadData[index].children.length > 0) {
      // this.value = this.single;
      this.single = this.loadData[index].children;
      // this.viewData = this.loadData[index];
      this.loadData = this.loadData[index].children;
      this.back = true;
      // this.backIndex++;
      console.log(JSON.stringify(this.original[index].children));
      console.log(JSON.stringify(this.viewData));
    }
  }
  backFunction() {
    this.single = this.original;
    /* this.backIndex--;
    console.log(this.backIndex);
    console.log(this.viewData);
    console.log(this.single); */
    this.back = false;
  }
}
