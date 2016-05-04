using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EgyptOCM.Models
{
    public class ClusterData
    {
       
        public string Cluster_ID { get; set; }
       
        public string Cluster_Name { get; set; }

        public int Govt_ID { get; set; }
        public string Govt_Name { get; set; }

        public int District_ID { get; set; }
        public string District_Name { get; set; }

        public int Village_ID { get; set; }
        public string Village_Name { get; set; }
       
        public string Address { get; set; }

        public int Sector_ID { get; set; }
       
      
        public string Products { get; set; }

        public decimal Cluster_Lat { get; set; }
        public decimal Cluster_Long { get; set; }

        public string Cluster_Info1 { get; set; }
        public string Cluster_Info2 { get; set; }
        public string Cluster_Info3 { get; set; }
        public string Cluster_Info4 { get; set; }
        public string Cluster_Info5 { get; set; }

        public double OfficalProjects { get; set; }
        public double NonOfficalProjects { get; set; }
        public double CompanyPercent1 { get; set; }
        public double CompanyPercent2 { get; set; }
        public double CompanyPercent3 { get; set; }
        public double CompanyPercent4 { get; set; }
        public double Cluster_EmpFemale { get; set; }
       
        public int  Cluster_ShopNumMin {get; set;}
        public int Cluster_ShopNumMax { get; set; }


        public string ClusterNature { get; set; }

    
        public string ClusterType { get; set; }

       
        public string SupportingOrg { get; set; }

       
        public string Challenges { get; set; }

      
        public string Cluster_ProductImage { get; set; }

       
        public string Cluster_ProcessImage { get; set; }

       
        public string Cluster_DetailPage1 { get; set; }
        public string Cluster_DetailPage2 { get; set; }
        public string Cluster_DetailPage3 { get; set; }

        public string Cluster_DetailPage1_Title { get; set; }
        public string Cluster_DetailPage2_Title { get; set; }
        public string Cluster_DetailPage3_Title { get; set; }

        public string Cluster_StudyFile1 { get; set; }
        public string Cluster_StudyFile2 { get; set; }
        public string Cluster_StudyFile3 { get; set; }
        public string Cluster_StudyFile4 { get; set; }
        public string Cluster_StudyFile5 { get; set; }

        public string Cluster_StudyFile1_Title { get; set; }
        public string Cluster_StudyFile2_Title { get; set; }
        public string Cluster_StudyFile3_Title { get; set; }
        public string Cluster_StudyFile4_Title { get; set; }
        public string Cluster_StudyFile5_Title { get; set; }


    }
}