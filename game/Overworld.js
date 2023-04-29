class Overworld {
    constructor(config) {
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d");
        this.map = null;
    }

    startGameLoop() {
        const step = () => {
            //Clear off the canvas
            this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
            
            //Establish Camera person
            const cameraPerson = this.map.gameObjects.hero;

            //Draw Lower layer
            this.map.drawLowerImage(this.ctx, cameraPerson);

            //Update all objects
            Object.values(this.map.gameObjects).forEach(object => {
                object.update({
                    arrow: this.directionInput.direction,
                    map: this.map,
                
                })
            })

            //Draw Game objects
            Object.values(this.map.gameObjects).sort((a,b) => {
                return a.y - b.y;
            }).forEach(object => {
                object.sprite.draw(this.ctx, cameraPerson);
            })

            //Draw Upper layer
            this.map.drawUpperImage(this.ctx,cameraPerson) ;

            requestAnimationFrame(() => {
                step();
            })
        }
        step();
    }

    bindActionInput() {
        new KeyPressListener("Enter", () => {
            //Is there a person here to talk to?
            this.map.checkForActionCutscene()
        })
    }

    bindHeroPositionCheck() {
        document.addEventListener("PersonWalkingComplete", e => {
            if(e.detail.whoId === "hero") {
                console.log("working!")
                //hero's position has changed
                this.map.checkForFootstepsCutscene()
            }
        })
    }

    init() {
        this.map = new OverworldMap(window.OverworldMaps.mainRoom);
        this.map.mountObjects();

        this.bindActionInput();
        this.bindHeroPositionCheck();
        this.directionInput = new DirectionInput();
        this.directionInput.init();
       
        this.startGameLoop();
        
        this.map.startCutscene([
        //    { type: "textMessage", text: "Hello everyone!"},
            // { who: "hero", type: "walk",direction: "up"},
            // { who: "hero", type: "walk",direction: "up"},
            // { who: "hero", type: "walk",direction: "up"},
            // { who: "hero", type: "walk",direction: "up"},
            // { who: "hero", type: "walk",direction: "up"},
            // { who: "npc2", type: "stand",direction: "left"},
            // { type: "textMessage", text: "Welcome to mytech 2022!"},
            //  { who: "npc1", type: "walk",direction: "left"},
            //  { who: "npc1", type: "stand",direction: "up", time: 800},



        ])

    }
} 