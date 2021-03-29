controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    makerController.player1.press(ArcadeButton.A)
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . 8 8 8 8 8 . . . . . 
        . . . . . 8 8 6 6 6 8 8 . . . . 
        . . . . 8 8 6 6 d d 6 6 8 . . . 
        . . . 8 8 6 6 6 6 6 6 6 8 8 . . 
        . . . 8 6 6 6 6 6 6 d 6 6 8 8 . 
        . . . 8 6 6 6 6 6 6 d d 6 6 8 . 
        . . . 8 6 6 6 6 6 6 6 d 6 6 8 . 
        . . . 8 8 6 6 6 6 6 6 6 6 8 8 . 
        . . . . 8 8 6 6 6 6 6 6 8 8 . . 
        . . . . . 8 8 8 6 6 6 8 8 . . . 
        . . . . . . . 8 8 8 8 8 . . . . 
        . . . . . . . . . . . . . . . . 
        `, spacePlane, 200, 0)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy(effects.fire, 500)
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    scene.cameraShake(4, 500)
    info.changeLifeBy(-1)
})
let bogey: Sprite = null
let projectile: Sprite = null
let spacePlane: Sprite = null
spacePlane = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . c c c c c c . . . . . . . 
    . . c c 5 5 5 5 5 c . . . . . . 
    . c 5 5 5 5 5 5 5 5 c . . . . . 
    . c 5 5 5 b b b b b b c . . . . 
    . . c c b b 1 b b b b c . . . . 
    . . . c 1 1 1 b b 1 1 c . . . . 
    . . . c 1 1 1 b 1 1 1 1 c . . . 
    c c b b 1 1 1 b 1 1 1 1 c . . . 
    c 5 5 5 1 b 1 b 1 1 1 d c c . . 
    c 5 b b 1 b 1 1 1 c 1 d c c . . 
    c 5 b f 1 b 1 1 1 1 1 d d c c . 
    c c . f b b b 1 1 1 1 1 d d d f 
    . . f 5 5 5 b b 1 1 1 f f f f f 
    . . f 5 5 5 5 5 f f f . . . . . 
    . . f f f f f f . . . . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(spacePlane, 200, 200)
spacePlane.setStayInScreen(true)
info.setLife(3)
game.onUpdateInterval(500, function () {
    bogey = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . c c c c . . . . 
        . . . . . . c c d d d d c . . . 
        . . . . . c c c c c c d c . . . 
        . . . . c c 4 4 4 4 d c c . . . 
        . . . c 4 d 4 4 4 4 4 1 c . c c 
        . . c 4 4 4 1 4 4 4 4 d 1 c 4 c 
        . c 4 4 4 4 1 4 4 4 4 4 1 c 4 c 
        f 4 4 4 4 4 1 4 4 4 4 4 1 4 4 f 
        f 4 4 4 f 4 1 c c 4 4 4 1 f 4 f 
        f 4 4 4 4 4 1 4 4 f 4 4 d f 4 f 
        . f 4 4 4 4 1 c 4 f 4 d f f f f 
        . . f f 4 d 4 4 f f 4 c f c . . 
        . . . . f f 4 4 4 4 c d b c . . 
        . . . . . . f f f f d d d c . . 
        . . . . . . . . . . c c c . . . 
        `, SpriteKind.Enemy)
    bogey.setVelocity(-100, 0)
    bogey.setPosition(160, randint(5, 115))
    bogey.setFlag(SpriteFlag.AutoDestroy, true)
})
