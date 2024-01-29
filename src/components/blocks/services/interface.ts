export interface IServicesDataItem {
  id: number;
  title: string;
  description: string;
  price: number;
}
export interface IServicesData {
  category: string;
  items: IServicesDataItem[];
}

export interface IServicesProps {
  servicesData: IServicesData[];
}

export interface IGeneratedTabItems {
  tabTitle: string;
  content: React.ReactNode;
}
