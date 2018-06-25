import { Component, OnInit, OnChanges } from '@angular/core';
import { ImageService } from '../services/image.service';
import { GalleryImage } from '../models/GalleryImage.model';
import { Observable } from 'rxjs/Observable'; 


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit, OnChanges {
  images: Observable<GalleryImage[]>;

  constructor(private imageService: ImageService) { }

  ngOnInit() {
  //  this.images = this.imageService.getImages();
    this.imageService.getImages().subscribe((items) => {
      console.log(items);
    });
  }

  ngOnChanges() {
  //   this.images = this.imageService.getImages();
  }
}
