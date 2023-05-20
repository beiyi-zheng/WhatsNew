namespace WhatsNew
{
    public class WhatsNewViewModel
    {
        public string Status { get; set; } = string.Empty;
        public List<ContentViewModel> ContentList { get; set; } = new List<ContentViewModel>();
        
    }

    public class ContentViewModel
    {
        public int Id { get; set; }
        public string Status { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public string Author { get; set; } = string.Empty;  
        public DateTime? PublishedDate { get; set; }
    }
}