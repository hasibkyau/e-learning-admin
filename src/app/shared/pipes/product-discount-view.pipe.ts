import {Pipe, PipeTransform} from '@angular/core';
import {Course} from '../../interfaces/common/course.interface';
import {DiscountTypeEnum} from '../../enum/discount.enum';

@Pipe({
  name: 'productDiscount'
})
export class ProductDiscountViewPipe implements PipeTransform {

  transform(product: Course, type: string): string {

    if (product) {
      switch (type) {
        case 'default': {
          if (product.discountType === DiscountTypeEnum.PERCENTAGE) {
            return `${product.discountAmount}%`;
          } else if (product.discountType === DiscountTypeEnum.CASH) {
            return `${product.discountAmount}৳`;
          } else {
            return 'N/A'
          }
        }
        default: {
          return 'N/A'
        }
      }
    } else {
      return 'N/A'
    }

  }

}
