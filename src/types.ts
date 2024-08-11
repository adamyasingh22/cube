export interface Customer {
    id: number;
    name: string;
    title: string;
    address: string;
  }
  
  export interface Photo {
    id: string;
    urls: {
      small: string;
    };
  }
  