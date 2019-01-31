import { Component, OnInit, Input } from '@angular/core';
import { PostService, ApiResponse, postnews } from '../post.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-post-content',
  templateUrl: './post-content.component.html',
  styleUrls: ['./post-content.component.css']
})
export class PostContentComponent implements OnInit {

  @Input() techpost: ApiResponse[] = [];
  @Input() content: string;
  @Input() page: number;
  throttle = 300;
  scrollDistance = 1;
  postsTemp: ApiResponse[] = [];
  constructor(private postService: PostService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    console.log("init")
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 4000);
  }

  onScrollDown() {
    if (this.content == "apps" || this.content == "gadgets" || this.content == "startups") {
      if (this.techpost.length <= 20 && this.page > 1) {
        this.page = 1;
      }
      this.page = this.page + 1;
      this.spinner.show();
      this.postService.getPost(this.content, this.page)
        .subscribe((res) => this.onSuccess(res));
    } else {
      this.postsTemp = []
      this.page = this.page + 1;
      this.spinner.show();
      this.postService.search(this.content, this.page)
        .subscribe((res) => this.onSuccess1(res));
    }

  }
  onSuccess(res) {
    if (res != undefined) {
      // this.myPhotosList = [];
      this.spinner.hide();
      res.forEach(item => {
        this.techpost.push(new postnews(item));
      });
    }

  }
  onSuccess1(res) {
    if (res != undefined) {
      // this.myPhotosList = [];
      res.forEach(item => {
        if (this.postsTemp.indexOf(new postnews(item)) < 0) {
          this.postsTemp.push(new postnews(item));
        }
      });
      console.log(this.postsTemp.length)
      if (this.postsTemp.length < 5) {
        this.page = this.page + 1
        this.postService.search(this.content, this.page)
          .subscribe((res) => this.onSuccess1(res));
      } else {
        this.spinner.hide();
        this.postsTemp.forEach(item => {
          this.techpost.push(new postnews(item));
        })
      }
    }

  }
}