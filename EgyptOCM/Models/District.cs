//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace EgyptOCM.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class District
    {
        public District()
        {
            this.Villages = new HashSet<Village>();
            this.Clusters = new HashSet<Cluster>();
        }
    
        public string District_ID { get; set; }
        public string District_Name { get; set; }
        public string Govt_ID { get; set; }
    
        public virtual Governorate Governorate { get; set; }
        public virtual ICollection<Village> Villages { get; set; }
        public virtual ICollection<Cluster> Clusters { get; set; }
    }
}
