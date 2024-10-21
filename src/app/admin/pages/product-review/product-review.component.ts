import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {UiService} from "../../../services/core/ui.service";
import {ConfirmDialogComponent} from "../../../shared/components/ui/confirm-dialog/confirm-dialog.component";
import {ReloadService} from "../../../services/core/reload.service";
import {ProductReviewService} from "../../../services/common/product-review.service";
import {ProductReview} from "../../../interfaces/common/product-review.interface";

@Component({
  selector: 'app-product-review',
  templateUrl: './product-review.component.html',
  styleUrls: ['./product-review.component.scss']
})
export class ProductReviewComponent implements OnInit {
  allReviews: ProductReview[] = [];
  reviewData: ProductReview;
  reviewId: string;

  constructor(
    private dialog: MatDialog,
    private reviewService: ProductReviewService,
    private uiService: UiService,
    private reloadService: ReloadService,
  ) {
  }

  ngOnInit(): void {
    this.reloadService.refreshData$
      .subscribe(() => {
        this.getAllReviews();
      });
    this.getAllReviews();
  }

  /**
   * COMPONENT DIALOG VIEW
   */
  public openConfirmDialog(data?: string) {
    this.reviewId = data;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: {
        title: 'Confirm Delete',
        message: 'Are you sure you want delete this category?'
      }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.getAllReviews();
        // this.updateReviewAndDelete();
      }
    });
  }

  // openComponentDialog(product: string) {
  //
  // }

  /**
   * HTTP REQ HANDLE
   */

  private getAllReviews() {
    this.reviewService.getAllReviews()
      .subscribe(res => {
        this.allReviews = res.data;

        this.reviewData = this.allReviews.find(m => m._id === this.reviewId)
        console.log("idddd+++", this.allReviews)
        console.log("reviewDat+++a", this.reviewData)


        if (this.reviewData) {

          this.updateReviewAndDelete()
        }
      }, error => {
        console.log(error);
      });
  }


  private updateReviewAndDelete() {
    console.log("hhhh")
    console.log("idddd", this.reviewId)
    console.log("reviewData", this.reviewData)
    this.reviewService.updateReviewAndDelete(this.reviewData)
      .subscribe(res => {
        // this.uiService.success(res.message);
        this.deleteReviewByReviewId()
      }, error => {
        console.log(error);
      });
  }

  /**
   * DELETE METHOD HERE
   */
  private deleteReviewByReviewId() {
    this.reviewService.deleteReviewByReviewId(this.reviewId)
      .subscribe(res => {
        this.uiService.success(res.message);
        this.reloadService.needRefreshData$();
      }, error => {
        console.log(error);
      });
  }

}
