formangular
===========

Data driving angular to make custom views (http://nmorse.github.io/formangular/)

Dynamic Templates are useful when data drives the view.

If you start with some data...
```
[
  {"name": "simple example", "content": "Basic content that could be rendered in several ways..."},
  {"name": "More involved demo", "content":["A Heading", "Some content", "Some more content..."] , "link": "demo2.html"}
]
```

add in some view information...
```
[{"template": "basic.html"}, {"template": "more_involved.html"}]
``` 

