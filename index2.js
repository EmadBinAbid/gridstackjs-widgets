var grid = GridStack.init();
var self = this;
/*grid.on('added', function (e, items) {
    // add anijs data to gridstack item
    for (var i = 0; i < items.length; i++) {
        items[i].el.setAttribute('data-anijs', 'if: added, do: swing animated, after: $removeAnimations, on: $gridstack');
    }
    AniJS.run();
    self.gridstackNotifier = AniJS.getNotifier('gridstack');
    // fire added event!
    self.gridstackNotifier.dispatchEvent('added');
});*/

class GridWidget {
    constructor(id) {
        this.id = id;
        this.x = 0;
        this.y = 0;
        this.width = 4;
        this.height = 4;
        this.widget = null;

        this.addWidget = this.addWidget.bind(this);
    }

    addWidget() {
        if (document.getElementById("url").value.startsWith("http://") && document.getElementById("url").value.length > 7) {
            let widgetText = `
                <div>
                    <div id="gsic${this.id}" class="grid-stack-item-content">
                        <div id="hdr${this.id}" class="header">
                            <div id="expand${this.id}">
                                <i class="fa fa-expand icon-left"></i>
                            </div>
                            
                            <div id="compress${this.id}" hidden>
                                <i class="fa fa-compress icon-left"></i>
                            </div>
                            Header ${this.id}
                            <i id="close${this.id}" class="fa fa-close icon-right"></i>
                        </div>
                        <webview id="wv${this.id}" partition="electron2" src="${document.getElementById("url").value}" autosize="on" >
                        </webview>
                    </div>
                </div>`;
            console.log(this.id);
            grid.addWidget(widgetText, this.x, this.y, this.width, this.height, true);

            this.widget = grid.engine.nodes[0];

            // console.log(this.widget);
        }
    };

    toggleFullScreenAndMinimizeScreen() {
        document.getElementById(`expand${this.id}`).hidden = !document.getElementById(`expand${this.id}`).hidden;
        document.getElementById(`compress${this.id}`).hidden = !document.getElementById(`compress${this.id}`).hidden;
    };

    registerFullScreen() {
        document.getElementById(`expand${this.id}`).hidden = false;
        document.getElementById(`expand${this.id}`).onclick = 
            () => {
                console.log(this);
                this.toggleFullScreenAndMinimizeScreen();
                grid.update(this.widget.el, 0, 0, window.innerWidth, window.innerHeight);
            }
    };

    registerMinimizeScreen() {
        document.getElementById(`compress${this.id}`).hidden = true;
        document.getElementById(`compress${this.id}`).onclick = 
            () => {
                console.log(this);
                this.toggleFullScreenAndMinimizeScreen();
                grid.update(this.widget.el, 0, 0, this.width, this.height);
            }
    };

    registerRemoveWidget() {
        document.getElementById(`close${this.id}`).onclick = 
        () => {
            console.log(this);
            grid.removeWidget(this.widget.el);
        }
    }
}

// let allWidgets = [];

let count = 0
function createNewWidget() {
    let g = new GridWidget(`g${count}`);
    g.addWidget();
    g.registerFullScreen();
    g.registerMinimizeScreen();
    g.registerRemoveWidget();

    // allWidgets.push(g);
    
    count += 1;
}

document.getElementById('btnAddWidget').onclick = createNewWidget;

/*var animationHelper = AniJS.getHelper();

//Defining removeAnimations to remove existing animations
animationHelper.removeAnimations = function (e, animationContext) {
    document.querySelectorAll('.grid-stack-item').forEach(function (el) {
        el.removeAttribute('data-anijs');
    });
}

addWidget();
*/