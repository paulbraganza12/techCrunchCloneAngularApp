export class Post {
    post_auth: string;
    post_desc: string;
    post_img: string;
    post_links: string;
    post_time: string;
    post_title: string;

    constructor(post_auth:string,post_desc: string,post_img: string, post_links: string, post_time: string,post_title: string) { 
      this.post_auth = post_auth;
      this.post_desc = post_desc;
      this.post_img = post_img;
      this.post_links = post_links;
      this.post_time = post_time;
      this.post_title = post_title;
   }  
  }