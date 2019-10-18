import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  images: string[] = [
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
    'https://www.w3schools.com/howto/img_forest.jpg',
    'https://cdn.cnn.com/cnnnext/dam/assets/181215042152-nasa-juno-01-large-169.jpg',
    'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
    'https://www.pond5.com/images/images_db/vlp/image-hero-poster.jpg',
    'https://res.cloudinary.com/fleetnation-static/image/asset/s--MifwX3dl--/f_auto/header-2018-2560w-c2f0f28235c4f87790c9d5181036c003',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxu3FrWCOi59a-Zems8rHMPaxxsKThUlRg6-ZOGe9fFgmMblQi'
  ];
  flag: boolean = true;
}
