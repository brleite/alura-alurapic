import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PhotoDetailsComponent } from "./photo-details.component";

@NgModule({
  declarations: [PhotoDetailsComponent],
  exports: [PhotoDetailsComponent],
  imports: [CommonModule]
})
export class PhotoDetailsModule {

}
