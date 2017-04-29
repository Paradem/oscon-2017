//
//  Sepiafy.swift
//  Plimage
//
//  Created by Jonathan Lebensold on 2017-04-28.
//  Copyright © 2017 Facebook. All rights reserved.
//

import Foundation

@objc(Sepiafy)
class Sepiafy: NSObject {
  
  var bridge: RCTBridge!
  
  @objc func tint(_ path:String) -> Void {
    NSLog("Tinting: %@", path);
    let theImageView    = UIImage(contentsOfFile: path)
    if let result = theImageView?.maskWithColor(color: UIColor.brown) {
      if let data = UIImagePNGRepresentation(result) {
        try? data.write(to: URL.init(fileURLWithPath: path))
        
        self.bridge.eventDispatcher().sendAppEvent( withName:"photoTinted", body: path )
        
      }
    }
  }
  
  
}

// from http://stackoverflow.com/questions/31803157/how-to-color-a-uiimage-in-swift/42400605
extension UIImage {
  
  func maskWithColor(color: UIColor) -> UIImage? {
    let maskImage = cgImage!
    
    let width = size.width
    let height = size.height
    let bounds = CGRect(x: 0, y: 0, width: width, height: height)
    
    let colorSpace = CGColorSpaceCreateDeviceRGB()
    let bitmapInfo = CGBitmapInfo(rawValue: CGImageAlphaInfo.premultipliedLast.rawValue)
    let context = CGContext(data: nil, width: Int(width), height: Int(height), bitsPerComponent: 8, bytesPerRow: 0, space: colorSpace, bitmapInfo: bitmapInfo.rawValue)!
    
    context.clip(to: bounds, mask: maskImage)
    context.setFillColor(color.cgColor)
    context.fill(bounds)
    
    if let cgImage = context.makeImage() {
      let coloredImage = UIImage(cgImage: cgImage)
      return coloredImage
    } else {
      return nil
    }
  }
  
}
