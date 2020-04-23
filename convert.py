
import os
with open('chat.html','r') as f:
    with open('out.html', 'w') as out:

        inHTML = f.readlines()
        f.close()

        for line in inHTML:
            if '{{url_for' in line:
                if '<link' in line:
                    
                    components = line.split()
                    href = components[-1]
                    components.pop(-1)
                    file = eval(href.split(')}}')[0].split('=')[1])
                    newpath = f'"./{file}"'
                    components[2] = f'href={newpath}>'
                    
                    html = ' '.join(components)
                    out.write(html +'\n')
                    # print(components)

                elif '<script' in line:
                    file =eval(line.split('"')[1::2][0].split(',')[1][:-3].split('=')[1])
                    html= f'<script src="./{file}""></script>'
                    out.write(html + '\n')
                    




                
            else:
                out.write(line)
                    
        out.close()
    f.close()
with open('out.html', 'r') as temp:
    with open('chat.html','w') as f:
        f.write(''.join(temp.readlines()))

os.remove("out.html")
