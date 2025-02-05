export interface PublisherInfo {
    name: string;
    walletAddress: string;
    logo: string;
    reputationScore: number;
  }
  
  export interface OperatorDetails {
    name: string;
    location: string;
    walletAddress: string;
    timing: string;
    operatorLogo: string;
  }
  
  export interface UserScore {
    stars: number;
    count: number;
  }
  
  export interface AdInfoItem {
    adTitle: string;
    adDescription: string;
    adImage: string;
    reputationScore?: string;
    repuationScore?: string;
    operatorDetails: OperatorDetails;
    moneySpent: string;
    userScores: UserScore[];
  }
  
  export interface DashboardData {
    publisherInfo: PublisherInfo;
    AdInfo: AdInfoItem[];
  }
  
  export interface DashboardResponse {
    success: boolean;
    data: DashboardData;
  }
  