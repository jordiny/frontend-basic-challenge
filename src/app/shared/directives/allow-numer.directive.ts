import { Directive, ElementRef, HostListener, Input } from "@angular/core";

@Directive({
  selector: "[numberOnly]",
  inputs: ['regexString'],
})
export class AllowNumberDirective {
  regexStr = "^[0-9]+$";
  @Input() regexString: string;

  constructor(private el: ElementRef) {
    console.log("constructor triggered", el);
  }

  @HostListener("keydown", ["$event"])
  onKeyDown(event) {
    return new RegExp(this.regexString).test(event.key);
  }
}
