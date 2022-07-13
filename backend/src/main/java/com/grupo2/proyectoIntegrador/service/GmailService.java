package com.grupo2.proyectoIntegrador.service;

import com.grupo2.proyectoIntegrador.model.Producto;
import com.grupo2.proyectoIntegrador.model.Reserva;
import com.grupo2.proyectoIntegrador.model.Usuario;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;
import java.util.UUID;

public class GmailService {
    private final static String from = "barbudosymaga@gmail.com";
    private final static String host = "smtp.gmail.com";
    private static Properties properties = System.getProperties();

    private static void setProperties() {
        properties.put("mail.smtp.host", host);
        properties.put("mail.smtp.port", "465");
        properties.put("mail.smtp.starttls.enable", "true");
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.socketFactory.port", "465");
        properties.put("mail.smtp.socketFactory.class",
                "javax.net.ssl.SSLSocketFactory");
    };
    private static Session getSession() {
        setProperties();
        return Session.getInstance(properties, new javax.mail.Authenticator() {

            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(from, "xatcunrhezkdpbzs");
            }

        });
    }

    public static void enviarConGMail(Usuario user, UUID code) {
        Session session = getSession();

        // Get the Session object.// and pass username and password


        try {
            // Create a default MimeMessage object.
            MimeMessage message = new MimeMessage(session);

            // Set From: header field of the header.
            message.setFrom(new InternetAddress(from));

            // Set To: header field of the header.
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(user.getEmail()));

            // Set Subject: header field
            message.setSubject("Activa tu cuenta de barbudosymaga!");
            // Now set the actual message
            message.setContent(
                    "<!DOCTYPE html>\n" +
                            "<html lang=\"en\" xmlns=\"http://www.w3.org/1999/xhtml\" xmlns:o=\"urn:schemas-microsoft-com:office:office\">\n" +
                            "<head>\n" +
                            "  <meta charset=\"UTF-8\">\n" +
                            "  <meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n" +
                            "  <meta name=\"x-apple-disable-message-reformatting\">\n" +
                            "  <title></title>\n" +
                            "  <!--[if mso]>\n" +
                            "  <noscript>\n" +
                            "    <xml>\n" +
                            "      <o:OfficeDocumentSettings>\n" +
                            "        <o:PixelsPerInch>96</o:PixelsPerInch>\n" +
                            "      </o:OfficeDocumentSettings>\n" +
                            "    </xml>\n" +
                            "  </noscript>\n" +
                            "  <![endif]-->\n" +
                            "  <style>\n" +
                            "    table, td, div, h1, p {font-family: Arial, sans-serif;}\n" +
                            "  </style>\n" +
                            "</head>\n" +
                            "<body style=\"margin:0;padding:0;\">\n" +
                            "  <table role=\"presentation\" style=\"width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#ffffff;\">\n" +
                            "    <tr>\n" +
                            "      <td align=\"center\" style=\"padding:0;\">\n" +
                            "        <table role=\"presentation\" style=\"width:602px;border-collapse:collapse;border:1px solid #cccccc;border-spacing:0;text-align:left;\">\n" +
                            "          <tr>\n" +
                            "            <td align=\"center\" style=\"padding:40px 0 30px 0;background:#1DBEB4;\">\n" +
                            "              <img src=\"https://dewey.tailorbrands.com/production/brand_version_mockup_image/402/7347231402_20ab9f67-3d93-4c7f-9107-f50f91a9e8a1.png?cb=1653594127\" alt=\"\" width=\"300\" style=\"height:auto;display:block;\" />\n" +
                            "            </td>\n" +
                            "          </tr>\n" +
                            "          <tr>\n" +
                            "            <td style=\"padding:36px 30px 42px 30px;\">\n" +
                            "              <table role=\"presentation\" style=\"width:100%;border-collapse:collapse;border:0;border-spacing:0;\">\n" +
                            "                <tr>\n" +
                            "                  <td style=\"padding:0 0 36px 0;color:#153643;\">\n" +
                            "                    <h1 style=\"font-size:24px;margin:0 0 20px 0;font-family:Arial,sans-serif;\">Hola, " + user.getNombre() + ", estas a un paso de crear tu cuenta!</h1>\n" +
                            "                    <p style=\"margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;\">Para finalizar tu registro solo tenes que confirmar tu email.\n" +
                            "                    Hacé click en el link abajo para confirmarlo.</p>\n" +
                            "                    <p style=\"margin:0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;\"><a href=\"http://barbudosymaga.ddns.net/usuarios/confirmar/" + code + "\" style=\"color:#ee4c50;text-decoration:underline;\">Confirmar mail.</a></p>\n" +
                            "                  </td>\n" +
                            "                </tr>\n" +
                            "                <tr>\n" +
                            "                  <td style=\"padding:0;\">\n" +
                            "                    Si el link de arriba no funciona, copiá y pega el siguiente link en tu navegador: <a href=\"http://barbudosymaga.ddns.net/usuarios/confirmar/" + code + "\">http://barbudosymaga.ddns.net/usuarios/confirmar/" + code + "</a>\n" +
                            "                  </td>\n" +
                            "                </tr>\n" +
                            "              </table>\n" +
                            "            </td>\n" +
                            "          </tr>\n" +
                            "          <tr>\n" +
                            "            <td style=\"padding:30px;background:#1DBEB4;\">\n" +
                            "              <table role=\"presentation\" style=\"width:100%;border-collapse:collapse;border:0;border-spacing:0;font-size:9px;font-family:Arial,sans-serif;\">\n" +
                            "                <tr>\n" +
                            "                  <td style=\"padding:0;width:50%;\" align=\"left\">\n" +
                            "                    <p style=\"margin:0;font-size:14px;line-height:16px;font-family:Arial,sans-serif;color:#ffffff;\">\n" +
                            "                      &reg; Barbudos y maga.<br/>\n" +
                            "                    </p>\n" +
                            "                  </td>\n" +
                            "                  <td style=\"padding:0;width:50%;\" align=\"right\">\n" +
                            "                    <table role=\"presentation\" style=\"border-collapse:collapse;border:0;border-spacing:0;\">\n" +
                            "                      <tr>\n" +
                            "                        <td style=\"padding:0 0 0 10px;width:38px;\">\n" +
                            "                          <a href=\"http://www.twitter.com/\" style=\"color:#ffffff;\"><img src=\"https://assets.codepen.io/210284/tw_1.png\" alt=\"Twitter\" width=\"38\" style=\"height:auto;display:block;border:0;\" /></a>\n" +
                            "                        </td>\n" +
                            "                        <td style=\"padding:0 0 0 10px;width:38px;\">\n" +
                            "                          <a href=\"http://www.facebook.com/\" style=\"color:#ffffff;\"><img src=\"https://assets.codepen.io/210284/fb_1.png\" alt=\"Facebook\" width=\"38\" style=\"height:auto;display:block;border:0;\" /></a>\n" +
                            "                        </td>\n" +
                            "                      </tr>\n" +
                            "                    </table>\n" +
                            "                  </td>\n" +
                            "                </tr>\n" +
                            "              </table>\n" +
                            "            </td>\n" +
                            "          </tr>\n" +
                            "        </table>\n" +
                            "      </td>\n" +
                            "    </tr>\n" +
                            "  </table>\n" +
                            "</body>\n" +
                            "</html>",
                    "text/html");
            // Send message
            Transport.send(message);
        } catch (MessagingException mex) {
            mex.printStackTrace();
        }
    }
    public static void confirmarReserva(Usuario user, Producto producto, Reserva reserva) {
        Session session = getSession();

        try {
            // Create a default MimeMessage object.
            MimeMessage message = new MimeMessage(session);

            // Set From: header field of the header.
            message.setFrom(new InternetAddress(from));

            // Set To: header field of the header.
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(user.getEmail()));

            // Set Subject: header field
            message.setSubject("Tu reserva ha sido confirmada!");
            // Now set the actual message
            message.setContent("",
                    "text/html");
            // Send message
            Transport.send(message);
        } catch (MessagingException mex) {
            mex.printStackTrace();
        }
    }

}
