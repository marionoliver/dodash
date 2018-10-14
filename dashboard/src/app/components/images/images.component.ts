import { Component, OnInit } from '@angular/core';
import { ImageService } from '../../services/image.service';
import { Image } from '../../models/image';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {

  imagesAll: Array<Image>;
  images: Array<Image>;

  constructor(private imageService: ImageService) { }

  ngOnInit() {
    this.getAllImages();
  }

  // Get all containers from the API
  getAllImages() {
    this.imageService.getAllImages()
      .subscribe(images => {
        this.imagesAll = images;
        this.images = this.imagesAll.filter(image => image.RepoTags != "<none>:<none>");
      });

  }

}
