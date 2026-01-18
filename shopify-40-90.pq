// shopify 40-90
let
    Source = Csv.Document(File.Contents("C:\Users\C-R\Desktop\Untitled spreadsheet - Copy of dataset_shopify-scraper-task_2026-01-15_23-09-35-252 (1) (1).csv"),[Delimiter=",", Columns=411, Encoding=1252, QuoteStyle=QuoteStyle.None]),
    #"Reversed Rows" = Table.ReverseRows(Source),
    #"Pivoted Column" = Table.Pivot(#"Reversed Rows", List.Distinct(#"Reversed Rows"[Column1]), "Column1", "Column2", List.Count),
    #"Parsed XML" = Table.TransformColumns(#"Pivoted Column",{{"Column1", Xml.Tables}}),
    #"Unpivoted Only Selected Columns" = Table.Unpivot(#"Parsed XML", {"Column1"}, "Attribute", "Value")
in
    #"Unpivoted Only Selected Columns"
