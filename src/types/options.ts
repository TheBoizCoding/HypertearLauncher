export default interface Options {
    //current version of the game
    build: number,
    //window position and size
    sizeX: number | undefined,
    sizeY: number | undefined,
    posX: number | undefined,
    posY: number | undefined,
    //specific options that are user/system prefrence
    hardwareAcceleration: boolean
}