using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace EgyptOCM.Models
{

    [MetadataType(typeof(ClusterMetadata))]
    public partial class Cluster
    {
    }

    [MetadataType(typeof(ClusterNatureMetaData))]
    public partial class ClusterNature
    {
    }

    [MetadataType(typeof(ClusterTypeMetaData))]
    public partial class ClusterType
    {
    }

    [MetadataType(typeof(DistrictMetaData))]
    public partial class District
    {
    }

    [MetadataType(typeof(ExportFlagMetaData))]
    public partial class ExportFlag
    {
    }

    [MetadataType(typeof(FieldMetaData))]
    public partial class Field
    {
    }
    [MetadataType(typeof(GovernorateMetaData))]
    public partial class Governorate
    {
    }

    [MetadataType(typeof(IncomeLevelMetaData))]
    public partial class IncomeLevel
    {
    }

    [MetadataType(typeof(MarketTypeMetaData))]
    public partial class MarketType
    {
    }

    [MetadataType(typeof(ProductMetaData))]
    public partial class Product
    {
    }

    [MetadataType(typeof(ProductSeasonMetaData))]
    public partial class ProductSeason
    {
    }

    [MetadataType(typeof(SectorMetaData))]
    public partial class Sector
    {
    }

    [MetadataType(typeof(VillageMetaData))]
    public partial class Village
    {
    }

    public class ClusterMetadata
    {
        // if you change the database and update the model
        // make sure to add these lines to the models/cluster.cs
        //public virtual District District { get; set; }
        //public virtual Village Village { get; set; }
        //public virtual ClusterNature ClusterNature { get; set; }
        //public virtual ClusterType ClusterType { get; set; }
        //public virtual ProductSeason ProductSeason { get; set; }
        //public virtual ExportFlag ExportFlag { get; set; }
        //public virtual IncomeLevel IncomeLevel { get; set; }
        //public virtual MarketType MarketType { get; set; }

        [Key]
        [StringLength(10)]
        public string Cluster_ID;

        [Required]
        [Display(Name = "اسم التجمع")]
        [StringLength(255)]
        public string Cluster_Name;

        [Required]
        [Display(Name = "المحافظة")]
        [StringLength(10)]
        public string Govt_ID;
             

        [Display(Name = "المركز/المدينة")]
        [StringLength(10)]
        public string District_ID;
       

        [Display(Name = "القرية")]
        [StringLength(10)]
        public string Village_ID;
      

        [StringLength(255)]
        [Display(Name = "العنوان")]
        public string Address;

        [Required]
        [Display(Name = "القطاع")]
        [StringLength(10)]
        public string Sector_ID;
            

        [Required]
        [Display(Name = "النشاط")]
        [StringLength(10)]
        public string Field_ID;
       
        [Required]
        [Display(Name = "المنتج")]
        [StringLength(10)]
        public string Product_ID;
        

        [StringLength(1024)]
        [DataType(DataType.MultilineText)]
        [Display(Name = "أهم منتجات التجمع")]
        public string Products;

        [StringLength(1024)]
        [DataType(DataType.MultilineText)]
        [Display(Name = "تفاصيل اكثر عن منتجات التجمع")]
        public string MoreProducts;

        [Required]
        [Display(Name = "خط العرض")]
        [Range(22, 32, ErrorMessage = "يجب ان يكون خط العرض بين 22 و 32")]
        public decimal Cluster_Lat;

        [Required]
        [Display(Name = "خط الطول")]
        [Range(24, 37, ErrorMessage = "يجب ان يكون خط الطول بين 24 و 37")]
        public decimal Cluster_Long;

        [Required]
        [DefaultValue(0)]
        [Range(0, int.MaxValue, ErrorMessage = "يجب ان يكون العدد اكبر من 0")]
        [Display(Name = "متوسط عدد العاملين")]
        public int Cluster_EmpNumMin;

        [Required]
        [DefaultValue(0)]
        [Range(0, int.MaxValue, ErrorMessage = "يجب ان يكون العدد اكبر من 0")]
        [Display(Name = "  عدد العاملين -الحد الاعلى")]
        public int Cluster_EmpNumMax;

        [DisplayFormat(ApplyFormatInEditMode = false, DataFormatString = "{0:P0}")]
        [Range(0, 1, ErrorMessage = "  يجب ان تكون النسبة بين 0 و 1")]
        [Display(Name = "نسبة عمالة المرأة ")]
        public decimal? Cluster_EmpFemale;

        [Required]
        [DefaultValue(0)]
        [Range(0, int.MaxValue, ErrorMessage = "يجب ان يكون العدد اكبر من 0")]
        [Display(Name = "متوسط عدد الوحدات الانتاجية")]
        public int Cluster_ShopNumMin;

        [Required]
        [DefaultValue(0)]
        [Range(0, int.MaxValue, ErrorMessage = "يجب ان يكون العدد اكبر من 0")]
        [Display(Name = "عدد الوحدات الانتاجية - الحد الاعلى")]
        public int Cluster_ShopNumMax;

        [DisplayFormat(ApplyFormatInEditMode = false, DataFormatString = "{0:P0}")]
        [Range(0, 1, ErrorMessage = "  يجب ان تكون النسبة بين 0 و 1")]
        [Display(Name = "نسبة المشاريع الرسمية في التجمع ")]
        public decimal? OfficalProjects;

        [DisplayFormat(ApplyFormatInEditMode = false, DataFormatString = "{0:P0}")]
        [Range(0, 1, ErrorMessage = "  يجب ان تكون النسبة بين 0 و 1")]
        [Display(Name = "نسبة المشاريع الغير رسمية في التجمع ")]
        public decimal? NonOfficalProjects;

        [DisplayFormat(ApplyFormatInEditMode = false, DataFormatString = "{0:P0}")]
        [Range(0, 1, ErrorMessage = "  يجب ان تكون النسبة بين 0 و 1")]
        [Display(Name = "نسبة الشركات المتناهية الصغر (أى عدد العمالة من 1 إلى 4) ")]
        public decimal? CompanyPercent1;

 [DisplayFormat(ApplyFormatInEditMode = false, DataFormatString = "{0:P0}")]
 [Range(0, 1, ErrorMessage = "  يجب ان تكون النسبة بين 0 و 1")]
 [Display(Name = "نسبة الشركات الصغيرة (أى عدد العمالة من 5 إلى 49) ")]
 public decimal? CompanyPercent2;

        [DisplayFormat(ApplyFormatInEditMode = false, DataFormatString = "{0:P0}")]
        [Range(0, 1, ErrorMessage = "  يجب ان تكون النسبة بين 0 و 1")]
        [Display(Name = "نسبة الشركات المتوسطة (أى عدد العمالة من 50 إلى 99) ")]
        public decimal? CompanyPercent3;

          [DisplayFormat(ApplyFormatInEditMode = false, DataFormatString = "{0:P0}")]
          [Range(0, 1, ErrorMessage = "  يجب ان تكون النسبة بين 0 و 1")]
          [Display(Name = "نسبة الشركات الكبيرة (أى عدد العمالة أكثر من 100) ")]
          public decimal? CompanyPercent4;


           [StringLength(10)]
           [Display(Name = "طبيعة هذا التجمع ")]
           public string ClusterNature_ID;
      

              [StringLength(10)]
              [Display(Name = " سبب تواجد التجمع ")]
              public string ClusterType_ID;

     

         [StringLength(1024)]
         [DataType(DataType.MultilineText)]
         [Display(Name = "الشركات / الهيئات / الجهات الداعمة للتجمع")]
         public string SupportingOrg;

         [StringLength(1024)]
         [DataType(DataType.MultilineText)]
         [Display(Name = "أهم التحديات التي يواجهها التجمع")]
         public string Challenges;

         [StringLength(1024)]
         [DataType(DataType.MultilineText)]
         [Display(Name = "تفاصيل اكثر عن التحديات التي يواجهها التجمع")]
         public string MoreChallenges;

         [StringLength(1024)]
         [DataType(DataType.Upload)]
         [Display(Name = "صورة المنتج")]
         public string Cluster_ProductImage;

         [StringLength(1024)]
         [DataType(DataType.Upload)]
         [Display(Name = "صورة عملية الانتاج")]
         public string Cluster_ProcessImage;

        [StringLength(1024)]
        [DataType(DataType.Upload)]
        [Display(Name = "دراسة عن التجمع ")]
        public string Cluster_StudyFile1;

         [StringLength(1024)]
         [DataType(DataType.Upload)]
         [Display(Name = "معلومات اضافية عن التجمع ")]
         public string Cluster_StudyFile2;

         [StringLength(1024)]
         [DataType(DataType.Url)]
         [Display(Name = " روابط لصفحات خارجية ذات صلة")]
         public string Cluster_DetailPage1;

         [StringLength(1024)]
         [Display(Name = " رابط 2")]
         [DataType(DataType.Url)]
         public string Cluster_DetailPage2;

         [StringLength(1024)]
         [Display(Name = " رابط 3")]
         [DataType(DataType.Url)]
         public string Cluster_DetailPage3;

         [StringLength(10)]
         [Display(Name = " اتجاهات المبيعات/أهم الأسواق   ")]
         public string MarketType_ID;
      

        [StringLength(10)]
        [Display(Name = " موسمية المنتجات المباعة ")]
        public string ProductSeason_ID;
     

        [StringLength(1024)]
        [DataType(DataType.MultilineText)]
        [Display(Name = " تفاصيل عن موسمية المنتجات المباعة ")]
        public string ProductSeasonDetail;


        [StringLength(10)]
        [Display(Name = " هل يقوم التجمع بالتصدير ")]
        public string ExportFlag_ID;
       
        [StringLength(255)]
        [Display(Name = " نسبة التصدير ")]
        public string ExportVolume;

        [StringLength(10)]
        [Display(Name = " متوسط مستوى الدخل للورشة / الشركة / الوحدة الإنتاجية فى التجمع  ")]
        public string IncomeLevel_ID;
       

        [StringLength(255)]
        [Display(Name = " بيانات إضافيةعن متوسط مستوى الدخل")]
        public string Income;

        [StringLength(1024)]
        [DataType(DataType.MultilineText)]
        [Display(Name = " بيانات إضافية عن التجمع ")]
        public string AdditionalInfo;
    }

    public class ClusterNatureMetaData
    {
        [Key]
        [StringLength(10)]
        [Display(Name = "طبيعة التجمع")]
        public string ClusterNature_ID;

        [Required]
        [StringLength(512)]
        [Display(Name = "طبيعة التجمع")]
        public string ClusterNature_Name;
    }

    public class ClusterTypeMetaData
    {
        [Key]
        [StringLength(10)]
        [Display(Name = "سبب تواجد التجمع ")]
        public string ClusterType_ID;

        [Required]
        [StringLength(512)]
        [Display(Name = "سبب تواجد التجمع ")]
        public string ClusterType_Name;
    }

    public class DistrictMetaData
    {
        [Key]
        [StringLength(10)]
        [Display(Name = "المركز/المدينة")]
        public string District_ID;
        [Required]
        [StringLength(255)]
        [Display(Name = "المركز/المدينة")]
        public string District_Name;

        [Required]
        [StringLength(10)]
        [Display(Name = "المحافظة")]
        public string Govt_ID;
            

    }

    public class ExportFlagMetaData
    {
        [Key]
        [StringLength(10)]
        public string ExportFlag_ID;

        [Required]
        [StringLength(255)]
        public string ExportFlag_Name;
    }

    public class FieldMetaData
    {
        [Key]
        [StringLength(10)]
        [Display(Name = "النشاط")]
        public string Field_ID;
        [Required]
        [StringLength(255)]
        [Display(Name = "النشاط")]
        public string Field_Name;

        [Required]
        [StringLength(10)]
        [Display(Name = "القطاع")]
        public string Sector_ID;
              
       
    }

    public class GovernorateMetaData
    {
        [Key]
        [StringLength(10)]
        [Display(Name = "المحافظة")]
        public string Govt_ID;

        [Required]
        [StringLength(255)]
        [Display(Name = "المحافظة")]
        public string Govt_Name;

        [Required]
        [Display(Name = "خط العرض")]
        [Range(22, 32, ErrorMessage = "يجب ان يكون خط العرض بين 22 و 32")]
        public decimal Govt_Lat;

        [Required]
        [Display(Name = "خط الطول")]
        [Range(24, 37, ErrorMessage = "يجب ان يكون خط الطول بين 24 و 37")]
        public decimal Govt_Long;

       }

    public class IncomeLevelMetaData
    {
        [Key]
        [StringLength(10)]
        public string IncomeLevel_ID;

        [Required]
        [StringLength(255)]
        public string IncomeLevel_Name;
    }

    public class MarketTypeMetaData
    {
        [Key]
        [StringLength(10)]
        [Display(Name = "اتجاهات المبيعات/أهم الأسواق   ")]
        public string MarketType_ID;

        [Required]
        [StringLength(255)]
        [Display(Name = "اتجاهات المبيعات/أهم الأسواق   ")]
        public string MarketType_Name;
    }

    public class ProductMetaData
    {
        [Key]
        [StringLength(10)]
        public string Product_ID;
        [Required]
        [StringLength(255)]
        [Display(Name = "المنتج")]
        public string Product_Name;

        [Required]
        [StringLength(10)]
        [Display(Name = "القطاع")]
        public string Sector_ID;
        [ForeignKey("Sector_ID")]
       

        [Required]
        [StringLength(10)]
        [Display(Name = "النشاط")]
        public string Field_ID;
        

    }

    public class ProductSeasonMetaData
    {
        [Key]
        [StringLength(10)]
        [Display(Name = "موسمية المنتجات المباعة ")]
        public string ProductSeason_ID;

        [Required]
        [StringLength(255)]
        [Display(Name = "موسمية المنتجات المباعة ")]
        public string ProductSeason_Name;
    }
    public class SectorMetaData
    {
        [Key]
        [StringLength(10)]
        [Display(Name = "القطاع")]
        public string Sector_ID;
        [Required]
        [StringLength(255)]
        [Display(Name = "القطاع")]
        public string Sector_Name;

      


    }

    public class VillageMetaData
    {
        [Key]
        [StringLength(10)]
        [Display(Name = "القرية")]
        public string Village_ID;

        [Required]
        [StringLength(255)]
        [Display(Name = "القرية")]
        public string Village_Name;

        [Required]
        [Display(Name = "المحافظة")]
        [StringLength(10)]
        public string Govt_ID;
     

        [Required]
        [Display(Name = "المركز/المدينة")]
        [StringLength(10)]
        public string District_ID;
           

    }

    
}