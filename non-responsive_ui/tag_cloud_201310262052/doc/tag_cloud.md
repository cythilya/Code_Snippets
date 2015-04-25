##Tag Cloud(標籤雲)	
###什麼是Tag Cloud(標籤雲)？
Tag Cloud是關鍵字的視覺化呈現，並有以下特點：

- 常按字母順序排列
- 依照重要程度改變字體大小或顏色
- 本身是連結(link)，指向與其相關項目的清單

範例圖示：	

![tag cloud](http://www.joelamantia.com/images/blog/best_practices_textcloud.jpg)	

資料來源：[10 Best Practices For Displaying Tag Clouds](http://www.joelamantia.com/tag-clouds/10-best-practices-for-displaying-tag-clouds)	

###為什麼要用Tag Cloud？
過去在地圖上常用不同粗細或顏色的字體來標註地區的重要性或相對面積。在網站中，視覺化網站的重點並顯示重要程度(例如：使用此關鍵字的次數)可讓使用者一目了然重點所在與想看的項目的內容數(比例)。

###如何用Tag Cloud？
產生Tag Cloud的工具如下：

- [TagCrowd](http://tagcrowd.com/)：可將直接貼上純文字檔、貼上網頁連結或上傳html檔，按下"Visualize!"即可產生Tag Cloud，可存成embed html或pdf。可選擇哪些tag不要顯示。不支援中文。
- [Tag Cloud Generator](http://www.tagcloud-generator.com/)：可自行加入tag，或選擇哪些tag不要顯示。產生一段embed html提供使用者嵌入網頁。同樣不支援中文。
- [Tagxedo](http://www.tagxedo.com/)：必須要安裝Silverlight，支援中文。範例如下圖示：
![tagxedo](http://img607.imageshack.us/img607/7453/fscw.png)

##Tag Cloud對SEO的影響
對於使用者來說，使用者可依某個主題(Tag with Keyword)來閱讀相關文章。

但要特別注意：

- Duplicate Content(重複內容)：tag pages會列出所有標註此tag的文章列表，為了防止網頁有重複的內容，在文章列表上，不要放整篇文章，放該文章的介紹內容即可。Duplicate Content可參考 [Google Duplicate Content Penalty](http://www.seo-gold.com/google-duplicate-content-penalty.html)
- Tag Cloud中含有太多的Tags(這些Tags也同樣是關鍵字)會被搜尋引擎判定為Keyword Stuffing，反而對SEO不利。
- 使用Tag Cloud或Category(例如側邊欄使用類別或關鍵字來分類文章)，**功能類似，擇一即可**。

對我來說，使用Tag Cloud比較多的原因是視覺呈現上的考量(畢竟看到鮮明的顏色和不同大小的字體，馬上就明白重點所在了...)。而且在寫主題非常明確的文章的時候，也不用把它藏在某某分類底下～

##Tag Cloud jQuery Plugin
幾個可以玩玩看的plugin：	

- [CSS Globe Tag Cloud](http://cssglobe.com/tag-clouds-styling-and-adding-sort-options)
- [Prataes jQuery Tag Cloud](http://www.pritaeas.net/public/jquery/jquery.tagcloud.0.5.0/index.html)
- [Goat 1000 Tag Canvas](http://www.goat1000.com/tagcanvas.php)
- [Awesome Cloud](http://indyarmy.com/awesomeCloud/)
- [Word Cloud Generator](http://www.jasondavies.com/wordcloud/#http%3A%2F%2Fwww.jasondavies.com%2Fwordtree%2Fcat-in-the-hat.txt)
- [Dyna Cloud](http://johannburkard.de/blog/programming/javascript/dynacloud-a-dynamic-javascript-tag-keyword-cloud-with-jquery.html)
- [AddyWaddy Tag Cloud](http://addywaddy.github.io/jquery.tagcloud.js/)
- [jQCloud](http://primegap.net/2011/03/04/jqcloud-a-jquery-plugin-to-build-neat-word-clouds/)
- [HTMLdrive 3D Tag Cloud](http://www.htmldrive.net/items/show/412/jquery-rotating-3d-tag-cloud)

因為喜歡簡單明瞭的風格，所以自己嘗試了[AddyWaddy Tag Cloud](http://addywaddy.github.io/jquery.tagcloud.js)。	

AddyWaddy Tag Cloud的說明文件用Markdown撰寫，清楚易懂。
可設定字體大小範圍、顏色、重要度(rel中設定)。

![addywaddy tag cloud](http://img849.imageshack.us/img849/8615/96ke.png)
	
我也練習寫了範例程式～:)	

- Demo：[http://cdpn.io/cpoiC](http://cdpn.io/cpoiC)	
- Source Code：[http://codepen.io/cythilya/pen/cpoiC](http://codepen.io/cythilya/pen/cpoiC)
- Snapshot：
![addy wadd tag cloud demo](http://img543.imageshack.us/img543/6416/ws4c.png)
---
Ref：

- [Tag cloud wiki](http://zh.wikipedia.org/wiki/%E6%A0%87%E7%AD%BE%E4%BA%91)
- [Should I use tags on my website?](http://webmaster-land.com/should-i-use-tags-on-my-website/)
- [Do tag clouds help or hinder SEO?](https://www.youtube.com/watch?v=bYPX_ZmhLqg)
- [Google Duplicate Content Penalty](http://www.seo-gold.com/google-duplicate-content-penalty.html)
- [10 Awesome jQuery Tag Cloud Plugins](http://www.websanova.com/blog/jquery/10-awesome-jquery-tag-cloud-plugins#.UmuN2_lmhcY)
