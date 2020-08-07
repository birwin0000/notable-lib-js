describe("Lib", function() {
  var lib = require('../../index');
  const jsdom = require("jsdom");
  var dom;
  var link;
  var head;

  beforeEach(function() {
      dom = new jsdom.JSDOM('<html><head></head><body><div id="content"></div></body></html>');
      global.window = dom.window;
      global.document = dom.window.document;
      this.link = {
          rel: null, 
          type: null, 
          href: null
      };
      this.head = [{
        appendChild: function(link) {
          if (link.onload) {
            link.onload();
          }
        }
      }];


    });

  it("should connect to a valid URL", function() {
    spyOn(document, 'createElement').and.returnValue(this.link);
    spyOn(document, 'getElementsByTagName').and.returnValue(this.head);
    var loadFn = {
      fn: () => console.log("Called!")
    }
    var loadSpy = spyOn(loadFn, "fn");
    var url = "http://someurl";
    lib.loadCSS(url, loadFn.fn);
    expect(loadSpy).toHaveBeenCalled();
    expect(this.link.rel).toBe("stylesheet");
    expect(this.link.type).toBe("text/css");
    expect(this.link.href).toBe(url);
  });


  it("should not connect to a invalid URL", function() {
    this.head = [{
      appendChild: function(link) {
        if (link.onerror) {
          link.onerror();
        }
      }
    }];
    spyOn(document, 'createElement').and.returnValue(this.link);
    spyOn(document, 'getElementsByTagName').and.returnValue(this.head);
    var failFn = {
      fn: () => console.log("Called!")
    }
    var failSpy = spyOn(failFn, "fn");
    var url = "http://someurl";
    lib.loadCSS(url, () => {}, failFn.fn);
    expect(failSpy).toHaveBeenCalled();
  });

  it("Should fail on an empty or null url", function () {
    spyOn(document, 'createElement').and.returnValue(this.link);
    spyOn(document, 'getElementsByTagName').and.returnValue(this.head);
    var failFn = {
      fn: () => console.log("Called!")
    }
    var failFn2 = {
      fn: () => console.log("Called!")
    }
    var failSpy = spyOn(failFn, "fn");
    var failSpy2 = spyOn(failFn2, "fn");
    var url = null;
    lib.loadCSS(url, () => {}, failFn.fn);
    expect(failSpy).toHaveBeenCalled();
    var url = "";
    lib.loadCSS(url, () => {}, failFn2.fn);
    expect(failSpy2).toHaveBeenCalled();
  });



});
