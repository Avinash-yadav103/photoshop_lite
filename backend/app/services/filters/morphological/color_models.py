def rgb_to_hsv(rgb):
    """
    Convert RGB to HSV color space.
    """
    r, g, b = rgb[0] / 255.0, rgb[1] / 255.0, rgb[2] / 255.0
    mx = max(r, g, b)
    mn = min(r, g, b)
    df = mx - mn
    if mx == mn:
        h = 0
    elif mx == r:
        h = (60 * ((g - b) / df) + 360) % 360
    elif mx == g:
        h = (60 * ((b - r) / df) + 120) % 360
    elif mx == b:
        h = (60 * ((r - g) / df) + 240) % 360
    if mx == 0:
        s = 0
    else:
        s = df / mx
    v = mx
    return (h, s, v)

def hsv_to_rgb(hsv):
    """
    Convert HSV to RGB color space.
    """
    h, s, v = hsv
    if s == 0:
        r = g = b = int(v * 255)
        return (r, g, b)
    i = int(h // 60) % 6
    f = (h / 60) - i
    p = int(v * (1 - s) * 255)
    q = int(v * (1 - f * s) * 255)
    t = int(v * (1 - (1 - f) * s) * 255)
    v = int(v * 255)
    if i == 0:
        return (v, t, p)
    elif i == 1:
        return (q, v, p)
    elif i == 2:
        return (p, v, t)
    elif i == 3:
        return (p, q, v)
    elif i == 4:
        return (t, p, v)
    elif i == 5:
        return (v, p, q)

def rgb_to_ycbcr(rgb):
    """
    Convert RGB to YCbCr color space.
    """
    r, g, b = rgb
    y  = 0.299 * r + 0.587 * g + 0.114 * b
    cb = 128 - 0.168736 * r - 0.331364 * g + 0.5 * b
    cr = 128 + 0.5 * r - 0.5 * g - 0.081312 * b
    return (y, cb, cr)

def ycbcr_to_rgb(ycbcr):
    """
    Convert YCbCr to RGB color space.
    """
    y, cb, cr = ycbcr
    r = y + 1.402 * (cr - 128)
    g = y - 0.344136 * (cb - 128) - 0.714136 * (cr - 128)
    b = y + 1.772 * (cb - 128)
    return (int(r), int(g), int(b))