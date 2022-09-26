import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetJsonPipe } from './get-json.pipe';

@NgModule({
	declarations: [GetJsonPipe],
	imports: [CommonModule],
	exports: [GetJsonPipe],
})
export class GetJsonModule {}
