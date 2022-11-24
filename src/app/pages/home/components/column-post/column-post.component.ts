import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/shared/post.schema';
import { PostService } from 'src/app/shared/post.service';

@Component({
  selector: 'app-column-post',
  templateUrl: './column-post.component.html',
  styleUrls: ['./column-post.component.scss'],
})
export class ColumnPostComponent implements OnInit {
  constructor(
    private readonly service: PostService,
    private readonly route: Router
  ) {}

  confirmationState: boolean = true;
  columnPosts: Post[] = [];

  async ngOnInit() {
    await this.getAllPosts();
    setTimeout(() => {
      const cPosts = document.querySelectorAll('.column-post');

      for (let i = 0; i < cPosts.length; i++) {
        const dots = document.querySelector(`.cdots${i}`) as HTMLElement;

        const options = document.querySelector(`.coptions${i}`) as HTMLElement;

        const deleteOptions = document.querySelector(
          `.delete${i}`
        ) as HTMLElement;

        const deleteConfirmation = document.querySelector(
          `.deleteOP${i}`
        ) as HTMLElement;

        const No = document.querySelector(`.cNo${i}`) as HTMLElement;

        dots?.addEventListener('click', () => {
          options!.classList.toggle('hidden');
        });

        deleteOptions.addEventListener('click', () => {
          deleteConfirmation.style.display = 'flex';
        });

        No.addEventListener('click', () => {
          deleteConfirmation.style.display = 'none';
        });
      }
    }, 800);
  }

  async getAllPosts() {
    this.service.getPosts().subscribe((data: Post[]) => {
      this.columnPosts = data.slice(0, 2);
    });
  }
  async sendDetailstoUpdatePage(details: Post) {
    this.route.navigate([`update/${details._id}`]);
  }
  async populateSinglePostData(details: Post) {
    this.route.navigate([`single-post/${details._id}`]);
  }
  async sendCategory(category: Post) {
    this.route.navigate([`category-post/${category.category}`]);
  }

  async deletePost(id: string, filename: string) {
    const deleted = await this.service.deletePost(id);
    const unlinked = await this.service.unlinkServerImage(filename);
    this.getAllPosts();
  }
}
