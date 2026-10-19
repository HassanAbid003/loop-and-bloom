import Settings from "./models/Settings.js";

export async function getPublicSettings(req, res, next) {
  try {
    let settings = await Settings.findOne();
    if (!settings) settings = await Settings.create({});
    
    // Only return public-safe fields
    res.json({
      announcementLeft: settings.announcementLeft,
      announcementCenter: settings.announcementCenter,
      announcementActive: settings.announcementActive,
    });
  } catch (err) {
    next(err);
  }
}