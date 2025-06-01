import os
import json
from glob import glob
from bs4 import BeautifulSoup

if __name__ == "__main__":
    # Get all HTML files in the current directory
    path = "../category"
    html_files = glob(os.path.join(path, "**/*.html"))
    # Initialize an empty list to store the subpage information
    subpage_info = []

    for file in html_files:
        category = os.path.basename(os.path.dirname(file))

        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
            soup = BeautifulSoup(content, 'html.parser')
            
            # meta: title, keyword, description
            title = soup.title.string if soup.title else None
            meta_keywords = soup.find('meta', attrs={'name': 'keywords'})
            meta_description = soup.find('meta', attrs={'name': 'description'})

            keywords = meta_keywords['content'] if meta_keywords else None
            description = meta_description['content'] if meta_description else None

            # post-meta: datetime
            createdDate = None
            post_meta = soup.find('div', class_='post-meta')
            if post_meta:
                time_tag = post_meta.find('time')
                if time_tag and time_tag.has_attr('datetime'):
                    createdDate = time_tag['datetime']

            # main-content: first image
            main_content = soup.find('article', id='main-content')
            first_img = None
            if main_content:
                img_tag = main_content.find('img')
                if img_tag and img_tag.has_attr('src'):
                    first_img = img_tag['src']
              
            if None in [title, keywords, description, createdDate, first_img]:
                raise ValueError(
                    f"Missing field in file {file}: "
                    f"title={title}, keywords={keywords}, description={description}, "
                    f"datetime={createdDate}, first_image={first_img}"
                )

            subpage_info.append({
                'created': createdDate,
                'title': title,
                'category': category,
                'tag': keywords,
                'thumbnail': first_img,
                'description': description,
            })

    subpage_info.sort(key=lambda x: x['created'])
    # Export to JS file
    with open('subpage_info.js', 'w', encoding='utf-8') as f:
        f.write('const Pages = ')
        json.dump(subpage_info, f, ensure_ascii=False, indent=4)
        f.write(';')

    print("Exported to subpage_info.js")
    