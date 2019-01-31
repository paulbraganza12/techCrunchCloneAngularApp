import { Component, OnInit } from '@angular/core';
import { PostService, ApiResponse, postnews } from '../post.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private postService: PostService,private spinner: NgxSpinnerService) { }
  posts: ApiResponse[] = []
  postsTemp: ApiResponse[] = []
  keyword: string
  temp: string[]
  content: string
  page: number
  ngOnInit() {
    this.content = "apps"
    this.page = 1
    console.log("Menu component initiated..")
    console.log("Making a request for apps post..")
    this.postService.getPost("apps", this.page)
      .subscribe((res) => this.onSuccess1(res));
    console.log("Request for apps post complete..")
  }

  //Handling all the calls 
  handleCall(element: string): void {
    //selecting the link
    this.keyword = null;
    this.posts=[]
    window.scroll(0, 0);
    console.log("In Handle call function...")
    let apps = document.getElementsByName("apps")
    let gadgets = document.getElementsByName('gadgets');
    let startups = document.getElementsByName('startup');
    switch (element) {
      case "apps": {
        this.content = "apps"
        this.page = 1
        console.log("User wants apps post ..")
        Array.prototype.forEach.call(apps, function (a) {
          a.className = "link mat-button active"
        });
        Array.prototype.forEach.call(gadgets, function (a) {
          a.className = "link mat-button"
        });
        Array.prototype.forEach.call(startups, function (a) {
          a.className = "link mat-button"
        });
        this.spinner.show();
        this.postService.getPost("apps", this.page)
          .subscribe((res) => this.onSuccess1(res));
        console.log("Request for apps post complete..")
        break;
      }
      case "gadgets": {
        this.content = "gadgets"
        this.page = 1
        console.log("User wants gadgets post ..")
        Array.prototype.forEach.call(apps, function (a) {
          a.className = "link mat-button"
        });
        Array.prototype.forEach.call(gadgets, function (a) {
          a.className = "link mat-button active"
        });
        Array.prototype.forEach.call(startups, function (a) {
          a.className = "link mat-button"
        });
        this.spinner.show();
        this.postService.getPost("gadgets", this.page)
          .subscribe((res) => this.onSuccess1(res));
        console.log("Request for gadgets post complete..")
        break;
      }
      case "startup": {
        this.content = "startups"
        this.page = 1
        console.log("User wants startups post ..")
        Array.prototype.forEach.call(apps, function (a) {
          a.className = "link mat-button"
        });
        Array.prototype.forEach.call(gadgets, function (a) {
          a.className = "link mat-button"
        });
        Array.prototype.forEach.call(startups, function (a) {
          a.className = "link mat-button active"
        });
        this.spinner.show();
        this.postService.getPost("startups", this.page)
          .subscribe((res) => this.onSuccess1(res));
        console.log("Request for startups post complete..")
        break;
      }
    }
  }

  //to handle serach 
  search(event: any) {
    window.scroll(0, 0);
    this.page = 1
    this.posts=[]
    this.keyword = event.target.value
    if (this.content.length > 8) {
      this.temp = this.content.split(" ")
      this.content = this.temp[0]
    }
    this.content = this.content + " " + this.keyword
    if (this.keyword != "") {
      console.log("User wants post related to " + this.keyword)
      this.spinner.show();
      this.postService.search(this.content, this.page)
        .subscribe((res) => this.onSuccess(res));
    } else {
      alert("Please enter a valid input")
    }

  }
  onSuccess1(res) {
    
    if (res != undefined) {
      // this.myPhotosList = [];
      if (this.page == 1) {
        this.postsTemp = []
      }
      res.forEach(item => {
        this.postsTemp.push(new postnews(item));
      });

      this.spinner.hide();
      this.postsTemp.forEach(item => {
        this.posts.push(new postnews(item));
      });

      if (this.postsTemp.length==0) {
           this.spinner.hide();
          alert("server not running please contact the server admin")
        }
    }

  }

  onSuccess(res) {
    if (res != undefined) {
      // this.myPhotosList = [];
      if (this.page == 1) {
        this.postsTemp = []
      }
      res.forEach(item => {
        if (this.postsTemp.indexOf(new postnews(item)) < 0) {
          this.postsTemp.push(new postnews(item));
        }
      });
      console.log(this.postsTemp.length)
      if (this.postsTemp.length < 4 && this.page < 15) {
        this.page = this.page + 1
        this.postService.search(this.content, this.page)
          .subscribe((res) => this.onSuccess(res));
      } else {
        if (this.postsTemp.length==0) {
           this.spinner.hide();
          alert("No recent post found")
        } else {
           this.spinner.hide();
          this.posts = this.postsTemp
        }
      }

    }

  }

  clear(event: any) {
    event.target.value = ""
  }

  onEnter(value: string) {
    alert(value)
  }

}
