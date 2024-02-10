import { Injectable } from '@angular/core';
import { Page } from '../../interfaces/page';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  public paginateData<T>(data: any[]): Page<T>[] {
    const pages: Page<T>[] = [
      {
        pageNumber: 1,
        data: [],
      },
    ];
    const limitItemsPerPage = 10;
    let currentPageNumber = 1;

    data.forEach((item) => {
      const currentPage = pages.find(
        (page) => page.pageNumber === currentPageNumber
      )!;
      if (currentPage.data.length < limitItemsPerPage) {
        currentPage.data.push(item);
        return;
      }

      const newPage = {
        pageNumber: currentPageNumber + 1,
        data: [item],
      };
      pages.push(newPage);
      currentPageNumber = newPage.pageNumber;
    });

    return pages;
  }

  nextPage<T>(data: Page<T>[], pageNumber: number): Page<T> | undefined {
    return data.find((page) => page.pageNumber === pageNumber);
  }

  setPage<T>(data: Page<T>[], pageNumber: number): Page<T> | undefined {
    return data.find((p) => p.pageNumber === pageNumber);
  }

  previusPage<T>(data: Page<T>[], pageNumber: number) {
    return data.find((page) => page.pageNumber === pageNumber);
  }
}
