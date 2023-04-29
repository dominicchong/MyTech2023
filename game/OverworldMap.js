class OverworldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects;
        this.walls = config.walls || {};
        this.cutsceneSpaces = config.cutsceneSpaces || object;
        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;

        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc;

        this.isCutscenePlaying = true;

    }

    drawLowerImage(ctx,cameraPerson){
        ctx.drawImage(
            this.lowerImage,
            
            utils.withGrid(14) - cameraPerson.x,
            utils.withGrid(9)- cameraPerson.y
            )
    }

    drawUpperImage(ctx,cameraPerson){
        ctx.drawImage(this.upperImage,
            utils.withGrid(14) - cameraPerson.x,
            utils.withGrid(9)- cameraPerson.y
            )
    }

    isSpaceTaken(currentX,currentY,direction){
        const {x,y} = utils.nextPosition(currentX,currentY,direction);
        return this.walls[`${x},${y}`] || false;
    }

    mountObjects() {
        Object.keys(this.gameObjects).forEach(key => {
            let object = this.gameObjects[key];
            object.id = key;
            //TODO: determine if this object should actually mount
            object.mount(this);
        })
    }

    async startCutscene(events) {
        this.isCutscenePlaying = true;
        
        for(let i=0;i<events.length; i++){
            const eventHandler = new OverworldEvent ({
                event: events[i],
                map: this,
            })
            await eventHandler.init();
        }
        this.isCutscenePlaying = false;

        //Rest NPCs to do their idle behavior
        Object.values(this.gameObjects).forEach(object => object.doBehaviorEvent(this))
    }

   

    checkForActionCutscene() {
        const hero = this.gameObjects["hero"];
        const nextCoords = utils.nextPosition(hero.x,hero.y,hero.direction);
        const match = Object.values(this.gameObjects).find(object => {
            return `${object.x},${object.y}` === `${nextCoords.x},${nextCoords.y}`
        })
        if (!this.isCutscenePlaying && match && match.talking.length) {
            this.startCutscene(match.talking[0].events)
        }
    }

    checkForFootstepsCutscene() {
        const hero = this.gameObjects["hero"];
        const match = this.cutsceneSpaces[ `${hero.x},${hero.y}` ];
        if (!this.isCutscenePlaying && match) {
            this.startCutscene(match[0].events)
        }
    }
    addWall(x,y) {
        this.walls[`${x},${y}`] = true;
    }
    removeWall(x,y) {
        delete this.walls[`${x},${y}`];
    }
    moveWall(wasX,wasY,direction) {
        this.removeWall(wasX,wasY);
        const {x,y} = utils.nextPosition(wasX,wasY,direction);
        this.addWall(x,y);
    }

    
}

//Objects of all the maps in game
window.OverworldMaps = {
    mainRoom: {
        lowerSrc:  "/game-assets/map.png",
        upperSrc: "/game-assets/mapUpper.png",
        gameObjects: {
            hero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(14),
                y:utils.withGrid(17),
            }),
            npc1: new Person({
                isPlayerControlled: false,
                x: utils.withGrid(14),
                y:utils.withGrid(9),
                src: "/game-assets/npc1.png",
                behaviorLoop: [
               
                    { type: "stand", direction: "down", time: 800},
                    { type: "stand", direction: "right", time: 800}
     

                ],
                talking: [
                    {
                        events: [
                           
                            { type: "textMessage", text: "Hello there!",faceHero: "npc1"},
                        ]
                    }
                ]
            }),
            npc2: new Person({
                isPlayerControlled: false,
                x: utils.withGrid(15),
                y:utils.withGrid(12),
                src: "/game-assets/npc1.png",
                behaviorLoop: [
                    // { type: "stand",direction: "right"},
                    // { type: "stand", direction: "up", time: 800},                  
                    // { type: "walk",direction: "up"},
                    // { type: "walk",direction: "right"},
                    // { type: "walk",direction: "down"},
                   

        
                ]
            })

        },
        walls: {
            /**entrance */
            [utils.asGridCoords(13,14)] : true, //placeholder to check
            [utils.asGridCoords(13,15)] : true,
            [utils.asGridCoords(13,17)] : true,
            [utils.asGridCoords(12,17)] : true, 
            [utils.asGridCoords(12,16)] : true,
            [utils.asGridCoords(12,15)] : true,  
            [utils.asGridCoords(12,13)] : true,  
            
            [utils.asGridCoords(16,14)] : true, 
            [utils.asGridCoords(16,15)] : true, 
            [utils.asGridCoords(16,17)] : true, 
            [utils.asGridCoords(17,16)] : true, 
            [utils.asGridCoords(17,15)] : true,               
            [utils.asGridCoords(17,14)] : true,  
            [utils.asGridCoords(17,13)] : true,               

            /**main hallway */
            [utils.asGridCoords(17,13)] : true,               
            [utils.asGridCoords(18,13)] : true,               
            [utils.asGridCoords(19,13)] : true,               
            [utils.asGridCoords(20,13)] : true, 
            [utils.asGridCoords(20,13)] : true,               

            

            [utils.asGridCoords(11,13)] : true,  
            [utils.asGridCoords(10,13)] : true,               
            [utils.asGridCoords(9,13)] : true,               
            [utils.asGridCoords(8,13)] : true,               
            [utils.asGridCoords(7,13)] : true, 
            [utils.asGridCoords(6,13)] : true,               






            [utils.asGridCoords(5,6)] : true
            // [utils.asGridCoords(7,6)] : true,

            
        },
        cutsceneSpaces:  {
            [utils.asGridCoords(14,12)] : [
                {
                    events: [
                        { type: "textMessage", text: "Hello there!",faceHero: "npc2"},
                       
                        
                    ]
                }
            ]
        }
    },
   
}
