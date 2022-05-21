import { Injectable } from '@angular/core';
import { element } from 'protractor';
import { Observable } from 'rxjs';

// in pixels, compress images have the width or height larger than 1024px
const portraitMinRatio = 3 / 9;
const portraitMaxRatio = 3 / 4;
const landscapeMinRatio = 3 / 4; // paysage min
const landscapeMaxRatio = 9 / 3; // paysage max

@Injectable({
  providedIn: 'root',
})
export class CompressImageService {
  compress(file: File): Observable<File> {
    const imageType = 'image/jpeg';
    const reader = new FileReader();
    reader.readAsDataURL(file);

    return Observable.create((observer) => {
      // This event is triggered each time the reading operation is successfully completed.
      reader.onload = (ev) => {
        // Create an html image element
        const img = this.createImage(ev);
        // Choose the side (width or height) that longer than the other
        const isLandscape = img.width > img.height;
        let imgRatio = 1;
        // Determines the ratios to compress the image
        if (isLandscape) {
          imgRatio = img.height / img.width;
          if (imgRatio > landscapeMaxRatio) {
            // gestion d'erreur image trop grande
          } else if (imgRatio < landscapeMinRatio) {
            // gestion d'erreur image trop petite
          } else {
            // image valide
          }
        } else {
          imgRatio = img.width / img.height;
          if (imgRatio > portraitMaxRatio) {
            // gestion d'erreur image trop grande
          } else if (imgRatio < portraitMinRatio) {
            // gestion d'erreur image trop petite
          } else {
            // image valide
          }
        }

        //file.size
        // defaultQualityRatio
        let qualityRatio = 0.7;
        let sizeMax = 1920;
        let sizeMin = 640;

        if (isLandscape) {
          if (img.width < sizeMin) {
            // massage d'erreur image trop petite
          }
        } else {
          if (img.height < sizeMin) {
            // massage d'erreur image trop petite
          }
        }

        // Fires immediately after the browser loads the object
        img.onload = () => {
          const elem = document.createElement('canvas');
          // resize width, height
          elem.width = isLandscape ? sizeMax : Math.floor(sizeMax * imgRatio);
          elem.height = isLandscape ? Math.floor(sizeMax * imgRatio) : sizeMax;

          const ctx = <CanvasRenderingContext2D>elem.getContext('2d');
          ctx.drawImage(img, 0, 0, elem.width, elem.height);
          console.log(imageType);
          ctx.canvas.toBlob(
            // callback, called when blob created
            (blob) => {
              observer.next(
                new File([blob], file.name, {
                  type: imageType,
                  lastModified: Date.now(),
                })
              );
            },
            imageType,
            qualityRatio
            // reduce image quantity
          );
        };
      };

      // Catch errors when reading file
      reader.onerror = (error) => observer.error(error);
    });
  }

  private createImage(ev) {
    let imageContent = ev.target.result;
    const img = new Image();
    img.src = imageContent;
    return img;
  }
}
